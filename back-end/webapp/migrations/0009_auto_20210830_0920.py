# Generated by Django 3.2.3 on 2021-08-30 09:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('webapp', '0008_auto_20210830_0913'),
    ]

    operations = [
        migrations.AlterField(
            model_name='moneytrack',
            name='budget',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='moneytrack',
            name='income',
            field=models.IntegerField(default=0),
        ),
    ]
