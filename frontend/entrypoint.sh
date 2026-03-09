#!/bin/sh
echo "Start script entrypoint"
BUILD_DIR="/usr/share/nginx/html/assets"

get_env_value() {
    VAR_NAME="$1"
    grep "^${VAR_NAME}=" env_file/.env | cut -d '=' -f 2-
}

while IFS= read -r line || [ -n "$line" ]; do
    case "$line" in
        \#*) continue ;;  # skip comments
        *)
            VAR_NAME=$(echo "$line" | cut -d '=' -f 1)
            VAR_VALUE=$(get_env_value "$VAR_NAME")
            for file in $BUILD_DIR/*.js; do
                echo "__${VAR_NAME}__ replace to ${VAR_VALUE} at file ${file}"
                sed -i "s|__${VAR_NAME}__|${VAR_VALUE}|g" "$file"
                echo -------------------
            done
        ;;
    esac
done < env_file/.env

echo "Starting NGINX..."
nginx -g "daemon off;"
