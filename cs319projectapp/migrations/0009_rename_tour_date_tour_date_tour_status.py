# Generated by Django 5.1.3 on 2024-12-21 10:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cs319projectapp', '0008_rename_date_tour_tour_date'),
    ]

    operations = [
        migrations.RenameField(
            model_name='tour',
            old_name='tour_date',
            new_name='date',
        ),
        migrations.AddField(
            model_name='tour',
            name='status',
            field=models.CharField(choices=[('pending', 'Pending'), ('accepted', 'Accepted'), ('rejected', 'Rejected')], default='pending', max_length=10),
        ),
    ]
