

-- We want to cryptographically hash passwords, therefore create this
-- extension.
create extension if not exists pgcrypto;