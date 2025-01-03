# Generated by Django 5.1.3 on 2024-12-21 11:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cs319projectapp', '0010_individualtour'),
    ]

    operations = [
        migrations.CreateModel(
            name='UniversityFair',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('contact_email', models.EmailField(max_length=254)),
                ('city', models.CharField(max_length=100)),
                ('highschool_name', models.CharField(max_length=255)),
                ('additional_notes', models.TextField(blank=True, null=True)),
                ('status', models.CharField(choices=[('pending', 'Pending'), ('accepted', 'Accepted'), ('rejected', 'Rejected')], default='pending', max_length=10)),
            ],
            options={
                'db_table': 'universityfairs',
            },
        ),
    ]
