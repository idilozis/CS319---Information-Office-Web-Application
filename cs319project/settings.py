"""
Django settings for cs319project project.

Generated by 'django-admin startproject' using Django 5.1.3.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.1/ref/settings/
"""

from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-=r69u*$dq&1kjef+u)8u4b!4)%+ant1nowyw@nm*(ra2cwi880'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ["127.0.0.1", "localhost", "139.179.209.206"] # 139.179.209.206
 

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'cs319projectapp',
    'django_extensions',
    'rest_framework',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

CSRF_COOKIE_SECURE = False  # Use True for production with HTTPS
SESSION_COOKIE_SECURE = False  # Use True for production with HTTPS

ROOT_URLCONF = 'cs319project.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],  # Use BASE_DIR for a dynamic path
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]


WSGI_APPLICATION = 'cs319project.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.1/ref/settings/#databases

"""DATABASES = {
    'Hakanto': {
        'ENGINE': 'django.db.backends.mysql',  # MySQL backend
        'NAME': 'project319',                 # Your database name
        'USER': 'Hakanto',                       # MySQL username
        'PASSWORD': '123cs319123',          # MySQL root password
        'HOST': 'localhost',                  # Default MySQL host
        'PORT': '3306',                       # Default MySQL port
    },
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'project319',  # Main application database
        'USER': 'yavuz',
        'PASSWORD': 'bilkent12345',
        'HOST': '127.0.0.1',
        'PORT': '3306',
    },
    'idil': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'project319',  # Separate authentication database
        'USER': 'idil',
        'PASSWORD': 'cs319.bilkent',
        'HOST': '127.0.0.1',
        'PORT': '3306',
    },
    'turker': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'project319',  # Separate authentication database
        'USER': 'tonio',
        'PASSWORD': 'cs319bombastic+',
        'HOST': '127.0.0.1',
        'PORT': '3306',
    },
    'moin': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'project319',  # Separate authentication database
        'USER': 'moinkhan30000',
        'PASSWORD': 'Moin@7017642414',
        'HOST': '127.0.0.1',
        'PORT': '3306',
    }
}"""
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'project319',  # Separate authentication database
        'USER': 'Hakanto',
        'PASSWORD': '123cs319123',
        'HOST': '127.0.0.1',
        'PORT': '3306',
    }
}



# Password validation
# https://docs.djangoproject.com/en/5.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

AUTH_USER_MODEL = 'cs319projectapp.UserAccount'

# Internationalization
# https://docs.djangoproject.com/en/5.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.1/howto/static-files/

STATIC_URL = '/static/'
STATICFILES_DIRS = [
    BASE_DIR / 'static',
    BASE_DIR / 'frontend/dist'
]



STATIC_ROOT = BASE_DIR / 'collected_static'  # Directory to collect static files


# Default primary key field type
# https://docs.djangoproject.com/en/5.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

LOGIN_URL = '/login/'

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [],
    'DEFAULT_PERMISSION_CLASSES': [],
}

