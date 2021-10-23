#!/bin/sh
set -e

echo "Invoking Django migrations ..."
python manage.py migrate --noinput

echo "Starting uwsgi ..."
exec "$@"
