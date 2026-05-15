const path = require("path");

/* -----------------------------
   ENV CONFIG
----------------------------- */

require("dotenv").config({
  path: path.join(__dirname, ".env"),
});

const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

const compression = require("compression");

const helmet = require("helmet");

const rateLimit = require("express-rate-limit");

const xss = require("xss");

/* -----------------------------
   ROUTES
----------------------------- */

const progressRoutes = require(
  "./routes/auth/progress"
);

const credsCodesRoutes = require(
  "./routes/admin/credsCodes"
);

const hcaptchaRoutes = require(
  "./routes/auth/hcaptcha"
);

const startLuckyDrawScheduler =
  require(
    "./utils/luckyDrawScheduler"
  );

const app = express();

/* -----------------------------
   CONFIG
----------------------------- */

const PORT =
  process.env.PORT || 5000;

const MONGO_URI =
  process.env.MONGO_URI;

const NODE_ENV =
  process.env.NODE_ENV ||
  "development";

if (!MONGO_URI) {
  console.error(
    "❌ MONGO_URI is missing"
  );

  process.exit(1);
}

/* -----------------------------
   TRUST PROXY
----------------------------- */

app.set("trust proxy", 1);

/* -----------------------------
   SECURITY HEADERS
----------------------------- */

/*
IMPORTANT:

RAW ADS REGISTRY SYSTEM
requires third-party scripts,
iframe embeds, native ads,
and external invoke.js files.

So CSP must be disabled.
*/

app.use(
  helmet({
    crossOriginResourcePolicy: false,

    contentSecurityPolicy: false,
  })
);

/* -----------------------------
   GLOBAL RATE LIMIT
----------------------------- */

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,

  max:
    NODE_ENV ===
    "production"
      ? 1000
      : 5000,

  standardHeaders: true,

  legacyHeaders: false,

  message: {
    success: false,

    message:
      "Too many requests. Please try again later.",
  },
});

app.use(globalLimiter);

/* -----------------------------
   AUTH RATE LIMIT
----------------------------- */

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,

  max: 20,

  standardHeaders: true,

  legacyHeaders: false,

  message: {
    success: false,

    message:
      "Too many login attempts. Please try again later.",
  },
});

/* ONLY AUTH ROUTES */

app.use(
  "/api/auth/login",
  authLimiter
);

app.use(
  "/api/auth/register",
  authLimiter
);

app.use(
  "/api/admin/auth/login",
  authLimiter
);

/* -----------------------------
   CORS
----------------------------- */

const allowedOrigins = [
  "http://localhost:5173",

  "http://localhost:5174",

  "https://revadoo.vercel.app",

  "https://revadooadmin.vercel.app",
];

app.use(
  cors({
    origin: function (
      origin,
      callback
    ) {
      /* ALLOW POSTMAN / SERVER */

      if (!origin) {
        return callback(
          null,
          true
        );
      }

      /* ALLOWED DOMAINS */

      if (
        allowedOrigins.includes(
          origin
        )
      ) {
        return callback(
          null,
          true
        );
      }

      return callback(
        new Error(
          "CORS not allowed"
        )
      );
    },

    credentials: true,
  })
);

/* -----------------------------
   PERFORMANCE
----------------------------- */

app.use(compression());

/* -----------------------------
   BODY PARSER
----------------------------- */

app.use(
  express.json({
    limit: "5mb",
  })
);

app.use(
  express.urlencoded({
    extended: true,

    limit: "5mb",
  })
);

/* -----------------------------
   XSS SANITIZER
----------------------------- */

const sanitizeObject = (
  obj
) => {
  if (
    !obj ||
    typeof obj !== "object"
  ) {
    return;
  }

  for (const key in obj) {
    const value = obj[key];

    if (
      typeof value === "string"
    ) {
      obj[key] = xss(value);
    } else if (
      typeof value ===
      "object"
    ) {
      sanitizeObject(value);
    }
  }
};

/* -----------------------------
   GLOBAL SANITIZER
----------------------------- */



app.use((req, res, next) => {
  /* SKIP RAW ADS ROUTES */

  if (
    req.originalUrl.startsWith(
      "/api/admin/ads"
    )
  ) {
    return next();
  }

  sanitizeObject(req.body);

  sanitizeObject(req.query);

  sanitizeObject(req.params);

  next();
});

/* -----------------------------
   ROOT HEALTH
----------------------------- */

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,

    message:
      "Revadoo backend is running",

    environment:
      NODE_ENV,
  });
});

/* -----------------------------
   API HEALTH
----------------------------- */

app.get(
  "/api/health",
  (req, res) => {
    res.status(200).json({
      success: true,

      uptime:
        process.uptime(),

      timestamp:
        new Date().toISOString(),
    });
  }
);

/* -----------------------------
   AUTH ROUTES
----------------------------- */

app.use(
  "/api/auth",
  require("./routes/auth/register")
);

app.use(
  "/api/auth",
  require("./routes/auth/login")
);

app.use(
  "/api/auth",
  require("./routes/auth/update")
);

/* -----------------------------
   USER PROGRESS
----------------------------- */

app.use(
  "/api/progress",
  progressRoutes
);

/* -----------------------------
   HCAPTCHA
----------------------------- */

app.use(
  "/api/hcaptcha",
  hcaptchaRoutes
);

/* -----------------------------
   ADMIN AUTH
----------------------------- */

app.use(
  "/api/admin/auth",
  require(
    "./routes/admin/adminAuth"
  )
);

/* -----------------------------
   ADMIN USERS
----------------------------- */

app.use(
  "/api/admin/users",
  require(
    "./routes/admin/adminUsers"
  )
);

/* -----------------------------
   ADMIN CREDS
----------------------------- */

app.use(
  "/api/admin/creds",
  credsCodesRoutes
);

/* -----------------------------
   ADMIN LUCKY DRAW
----------------------------- */

app.use(
  "/api/admin/lucky-draw",
  require(
    "./routes/admin/luckyDrawRoutes"
  )
);

/* -----------------------------
   RAW ADS REGISTRY
----------------------------- */

app.use(
  "/api/admin/ads",
  require(
    "./routes/admin/ads"
  )
);

/* -----------------------------
   INVALID API ROUTE
----------------------------- */

app.use("/api", (req, res) => {
  res.status(404).json({
    success: false,

    message:
      "API route not found",
  });
});

/* -----------------------------
   GLOBAL ERROR HANDLER
----------------------------- */

app.use(
  (
    err,
    req,
    res,
    next
  ) => {
    console.error(
      "❌ Server Error:",
      err.message
    );

    res.status(
      err.status || 500
    ).json({
      success: false,

      message:
        NODE_ENV ===
        "production"
          ? "Internal server error"
          : err.message,
    });
  }
);

/* -----------------------------
   DATABASE CONNECTION
----------------------------- */

mongoose
  .connect(MONGO_URI, {
    serverSelectionTimeoutMS: 15000,
  })

  .then(() => {
  console.log(
    "✅ MongoDB connected"
  );

  /* START LUCKY DRAW SCHEDULER */

  startLuckyDrawScheduler();

  app.listen(PORT, () => {
    console.log(
      `🚀 Server running on port ${PORT}`
    );
  });
})

  .catch((err) => {
    console.error(
      "❌ MongoDB connection failed:",
      err.message
    );

    process.exit(1);
  });

/* -----------------------------
   UNHANDLED REJECTION
----------------------------- */

process.on(
  "unhandledRejection",
  (err) => {
    console.error(
      "❌ Unhandled Rejection:",
      err.message
    );
  }
);

/* -----------------------------
   UNCAUGHT EXCEPTION
----------------------------- */

process.on(
  "uncaughtException",
  (err) => {
    console.error(
      "❌ Uncaught Exception:",
      err.message
    );

    process.exit(1);
  }
);