# Generated by Django 4.1.4 on 2022-12-21 17:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('common', '0005_alter_user_name'),
    ]

    operations = [
        migrations.CreateModel(
            name='Admin',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=40)),
                ('password', models.CharField(blank=True, max_length=255)),
                ('email', models.EmailField(blank=True, max_length=128)),
                ('reg_date', models.DateField(null=True)),
            ],
        ),
    ]
