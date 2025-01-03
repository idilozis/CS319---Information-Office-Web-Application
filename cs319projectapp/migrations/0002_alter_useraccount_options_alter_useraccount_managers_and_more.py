# Generated by Django 5.1.3 on 2024-12-15 17:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cs319projectapp', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='useraccount',
            options={},
        ),
        migrations.AlterModelManagers(
            name='useraccount',
            managers=[
            ],
        ),
        migrations.RemoveField(
            model_name='useraccount',
            name='date_joined',
        ),
        migrations.RemoveField(
            model_name='useraccount',
            name='email',
        ),
        migrations.RemoveField(
            model_name='useraccount',
            name='first_name',
        ),
        migrations.RemoveField(
            model_name='useraccount',
            name='last_name',
        ),
        migrations.RemoveField(
            model_name='useraccount',
            name='username',
        ),
        migrations.AlterField(
            model_name='useraccount',
            name='id',
            field=models.CharField(max_length=50, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='useraccount',
            name='is_active',
            field=models.BooleanField(default=True),
        ),
        migrations.AlterField(
            model_name='useraccount',
            name='is_staff',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='useraccount',
            name='password',
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name='useraccount',
            name='role',
            field=models.CharField(choices=[('Guide', 'Guide'), ('Advisor', 'Advisor'), ('Coordinator', 'Coordinator'), ('Director', 'Director'), ('Promo_Coordinator', 'Promo_Coordinator'), ('Guest', 'Guest')], max_length=50),
        ),
    ]
