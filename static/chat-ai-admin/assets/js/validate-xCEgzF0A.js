function h(t){if(t.length<6||t.length>32)return!1;const e=/[a-zA-Z]/.test(t),n=/[0-9]/.test(t),s=/[!@#$%^&*()\-_=+{};:,<.>]/.test(t);return e&&n||e&&s||n&&s}export{h as v};
