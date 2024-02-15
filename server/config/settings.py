import os

ACCESS_TOKEN_EXPIRE_MINUTES = 30
REFRESH_TOKEN_EXPIRE_MINUTES = 60 * 24 * 30
ALGORITHM = "HS256"
JWT_SECRET_KEY = os.environ["JWT_SECRET_KEY"]
JWT_REFRESH_SECRET_KEY = os.environ["JWT_REFRESH_SECRET_KEY"]
EMAIL_HOST = os.environ.get('EMAIL_HOST', 'default_value')
EMAIL_PORT = os.environ.get('EMAIL_PORT', 'default_value')
EMAIL_USERNAME = os.environ.get('EMAIL_USERNAME', 'default_value')
EMAIL_PASSWORD = os.environ.get('EMAIL_PASSWORD', 'default_value')
EMAIL_FROM = os.environ.get('EMAIL_FROM', 'default_value')
CELERY_BROKER_URL: str = os.environ.get('CELERY_BROKER_URL', 'redis://127.0.0.1:6379/0')
CELERY_RESULT_BACKEND: str = os.environ.get('CELERY_RESULT_BACKEND', 'redis://127.0.0.1:6379/0')
COMMISSION: float = float(os.environ.get('COMMISSION'))
SMS_API_ID = os.environ.get('SMS_API_KEY', 'default_value')