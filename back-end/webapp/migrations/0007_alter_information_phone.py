# Generated by Django 3.2.3 on 2021-08-20 10:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('webapp', '0006_information'),
    ]

    operations = [
        migrations.AlterField(
            model_name='information',
            name='phone',
            field=models.CharField(max_length=100),
        ),
    ]