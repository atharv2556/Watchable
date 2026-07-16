/* ==========================================================
   WATCHABLE GOOGLE OAUTH & CLIENT-SIDE ENCRYPTION CONFIG
   ========================================================== */

// 1. ENVIRONMENT CONFIGURATION CACHE & LOADER
let envConfig = {};

async function loadEnvConfig() {
    try {
        const response = await fetch('.env');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        
        text.split(/\r?\n/).forEach(line => {
            const trimmed = line.trim();
            // Skip empty lines or comments
            if (trimmed && !trimmed.startsWith('#')) {
                const index = trimmed.indexOf('=');
                if (index !== -1) {
                    const key = trimmed.substring(0, index).trim();
                    const value = trimmed.substring(index + 1).trim();
                    // Strip enclosing quotes if present
                    envConfig[key] = value.replace(/^['"]|['"]$/g, '');
                }
            }
        });
    } catch (e) {
        console.warn("Could not load or parse .env file. Using defaults/localStorage:", e);
    }
    return envConfig;
}

const DEFAULT_CONFIG = {
    googleClientId: '',     // Loaded from .env or configured in UI
    googleClientSecret: '', // Loaded from .env or configured in UI
    encryptionSecretKey: 'watchable-default-secure-key-1992', // Default AES key
    supabaseUrl: 'https://sebusfrzbejgjnlmsfvv.supabase.co',
    supabaseAnonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNlYnVzZnJ6YmVqZ2pubG1zZnZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM1OTQxMTAsImV4cCI6MjA5OTE3MDExMH0.DfzXBl0bk-EpY-cYInA1FzybZM8_oObEj2RyhPsiw8s'
};

// 2. RETRIEVE CONFIGURATION STATE
// Prioritizes settings in .env, then Local Storage inputs
function getAuthConfig() {
    const localId = localStorage.getItem('watchable_google_client_id');
    const localSecret = localStorage.getItem('watchable_google_client_secret');
    const localKey = localStorage.getItem('watchable_encryption_key');
    const localSupabaseUrl = localStorage.getItem('watchable_supabase_url');
    const localSupabaseAnonKey = localStorage.getItem('watchable_supabase_anon_key');
    
    return {
        googleClientId: envConfig.GOOGLE_CLIENT_ID || localId || DEFAULT_CONFIG.googleClientId,
        googleClientSecret: envConfig.GOOGLE_CLIENT_SECRET || localSecret || DEFAULT_CONFIG.googleClientSecret,
        encryptionSecretKey: envConfig.AES_ENCRYPTION_SECRET || localKey || DEFAULT_CONFIG.encryptionSecretKey,
        supabaseUrl: envConfig.SUPABASE_URL || localSupabaseUrl || DEFAULT_CONFIG.supabaseUrl,
        supabaseAnonKey: envConfig.SUPABASE_ANON_KEY || localSupabaseAnonKey || DEFAULT_CONFIG.supabaseAnonKey
    };
}

// 3. PERSIST CONFIGURATION STATE
function saveAuthConfig(clientId, clientSecret, encryptionKey, supabaseUrl, supabaseAnonKey) {
    localStorage.setItem('watchable_google_client_id', clientId ? clientId.trim() : '');
    localStorage.setItem('watchable_google_client_secret', clientSecret ? clientSecret.trim() : '');
    localStorage.setItem('watchable_encryption_key', encryptionKey ? encryptionKey.trim() : '');
    localStorage.setItem('watchable_supabase_url', supabaseUrl ? supabaseUrl.trim() : '');
    localStorage.setItem('watchable_supabase_anon_key', supabaseAnonKey ? supabaseAnonKey.trim() : '');
}

// 4. RESET CONFIGURATION STATE
function resetAuthConfig() {
    localStorage.removeItem('watchable_google_client_id');
    localStorage.removeItem('watchable_google_client_secret');
    localStorage.removeItem('watchable_encryption_key');
    localStorage.removeItem('watchable_supabase_url');
    localStorage.removeItem('watchable_supabase_anon_key');
}

// 5. ENCRYPT DATA CLIENT-SIDE (AES-256)
function encryptData(plaintext) {
    if (!plaintext) return '';
    if (typeof plaintext !== 'string') plaintext = String(plaintext);
    
    const config = getAuthConfig();
    const key = config.encryptionSecretKey;
    
    try {
        if (typeof CryptoJS === 'undefined') {
            console.warn("CryptoJS is not loaded. Saving data in plaintext.");
            return plaintext;
        }
        return CryptoJS.AES.encrypt(plaintext, key).toString();
    } catch (e) {
        console.error("Encryption failed:", e);
        return plaintext;
    }
}

// 6. DECRYPT DATA CLIENT-SIDE (AES-256)
function decryptData(ciphertext) {
    if (!ciphertext) return '';
    
    const config = getAuthConfig();
    const key = config.encryptionSecretKey;
    
    try {
        if (typeof CryptoJS === 'undefined') {
            console.warn("CryptoJS is not loaded. Cannot decrypt.");
            return ciphertext;
        }
        const bytes = CryptoJS.AES.decrypt(ciphertext, key);
        const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
        return decryptedText || '[Decryption Error: Invalid Key]';
    } catch (e) {
        console.error("Decryption failed:", e);
        return '[Decryption Error]';
    }
}

// 7. EXPOSE UTILITIES TO GLOBAL WINDOW OBJECT
window.WatchableAuth = {
    loadEnvConfig,
    getAuthConfig,
    saveAuthConfig,
    resetAuthConfig,
    encryptData,
    decryptData,
    defaultConfig: DEFAULT_CONFIG
};
