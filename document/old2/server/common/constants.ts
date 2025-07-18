const constants = {
    // // Server configuration
    // SERVER_PORT: process.env.PORT || 3000,
    // SERVER_HOST: process.env.HOST || 'localhost',
    // // Database configuration
    // DB_HOST: process.env.DB_HOST || 'localhost',
    // DB_PORT: process.env.DB_PORT || 5432,
    // DB_USER: process.env.DB_USER || 'user',
    // DB_PASSWORD: process.env.DB_PASSWORD || 'password',
    // DB_NAME: process.env.DB_NAME || 'database',
    // // Security settings
    // SESSION_SECRET: process.env.SESSION_SECRET ||   'your-secret-key',
    // CSRF_TOKEN_NAME: 'X-CSRF-Token',        
    // // Application settings
    // APP_NAME: 'My Application',
    // APP_VERSION: '1.0.0',
    // // Logging settings
    // LOG_LEVEL: process.env.LOG_LEVEL || 'info',
    // LOG_FILE: process.env.LOG_FILE || 'app.log',
    // // Feature flags
    // FEATURE_X_ENABLED: process.env.FEATURE_X_ENABLED || false,
    // FEATURE_Y_ENABLED: process.env.FEATURE_Y_ENABLED || false,
    // // API settings
    // API_BASE_URL: process.env.API_BASE_URL || 'http://api.example.com',
    // API_TIMEOUT: process.env.API_TIMEOUT || 5000,
    // // Email settings
    // EMAIL_SERVICE: process.env.EMAIL_SERVICE || 'gmail',
    // EMAIL_USER: process.env.EMAIL_USER || '',
    // EMAIL_PASSWORD: process.env.EMAIL_PASSWORD || '',
    // // Third-party service keys
    // THIRD_PARTY_SERVICE_KEY: process.env.THIRD_PARTY_SERVICE_KEY || '',
    // // Miscellaneous
    // MAX_UPLOAD_SIZE: process.env.MAX_UPLOAD_SIZE || '10mb',
    // SUPPORTED_LANGUAGES: process.env.SUPPORTED_LANGUAGES || 'en,ja',
    // DEFAULT_LANGUAGE: process.env.DEFAULT_LANGUAGE || 'en',
    // // Cache settings
    // CACHE_ENABLED: process.env.CACHE_ENABLED || false,
    // CACHE_TTL: process.env.CACHE_TTL || 3600, // in seconds
    // // Rate limiting settings
    // RATE_LIMIT_MAX: process.env.RATE_LIMIT_MAX || 100,
    // RATE_LIMIT_WINDOW: process.env.RATE_LIMIT_WINDOW || 15 * 60 * 1000, // 15 minutes
    // // Maintenance mode
    // MAINTENANCE_MODE: process.env.MAINTENANCE_MODE || false,
    // // Feature toggles
    // FEATURE_A_ENABLED: process.env.FEATURE_A_ENABLED || true,
    // FEATURE_B_ENABLED: process.env.FEATURE_B_ENABLED || false,
    // // Debug settings
    // DEBUG_MODE: process.env.DEBUG_MODE || false,
    // DEBUG_LEVEL: process.env.DEBUG_LEVEL || 'verbose',
    // // path settings
    // PATH_TO_LOGS: process.env.PATH_TO_LOGS || '/var/logs/myapp',    
    // PATH_TO_UPLOADS: process.env.PATH_TO_UPLOADS || '/var/uploads/myapp',
    // // Custom headers   
    // CUSTOM_HEADER_1: process.env.CUSTOM_HEADER_1 || 'X-Custom-Header-1',
    // CUSTOM_HEADER_2: process.env.CUSTOM_HEADER_2 || 'X-Custom-Header-2',
    // // API keys

    // API_KEY_SERVICE_A: process.env.API_KEY_SERVICE_A || 'your-api-key-a',
    // API_KEY_SERVICE_B: process.env.API_KEY_SERVICE_B || 'your-api-key-b',
    // // OAuth settings
    // OAUTH_CLIENT_ID: process.env.OAUTH_CLIENT_ID || 'your-client-id',
    // OAUTH_CLIENT_SECRET: process.env.OAUTH_CLIENT_SECRET
    //     || 'your-client-secret',
    // OAUTH_REDIRECT_URI: process.env.OAUTH_REDIRECT_URI || 'http://localhost:3000/oauth/callback',   
    // // Payment settings 
    // PAYMENT_GATEWAY_API_KEY: process
    //     .env.PAYMENT_GATEWAY_API_KEY || 'your-payment-gateway-api-key',
    // PAYMENT_GATEWAY_SECRET: process
    //     .env.PAYMENT_GATEWAY_SECRET || 'your-payment-gateway-secret',
    // // Analytics settings
    // ANALYTICS_TRACKING_ID: process.env.ANALYTICS_TRACKING_ID || 'UA-XXXXX-Y',   
    // ANALYTICS_ENABLED: process.env.ANALYTICS_ENABLED || false,
    // // Localization settings
    // LOCALE_DEFAULT: process.env.LOCALE_DEFAULT || 'en-US',
    // LOCALE_SUPPORTED: process.env.LOCALE_SUPPORTED || 'en-US,ja-JP,fr-FR',  
    // // File storage settings
    // FILE_STORAGE_PATH: process.env.FILE_STORAGE_PATH || '/var/storage/files',
    // FILE_STORAGE_MAX_SIZE: process.env.FILE_STORAGE_MAX_SIZE || '100mb',
    // 共通定数定義
    SESSION_USER_KEY: 'user',
    SESSION_TIMEOUT_MS: 30 * 60 * 1000, // 30分
    CSRF_TOKEN_KEY: 'csrfToken',
}

module.exports = constants;