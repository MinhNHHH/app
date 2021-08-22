# Generated by Django 3.2.3 on 2021-08-19 14:21

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('webapp', '0005_alter_transaction_time_trade'),
    ]

    operations = [
        migrations.CreateModel(
            name='Information',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fullname', models.CharField(max_length=100)),
                ('address', models.CharField(max_length=100)),
                ('phone', models.IntegerField()),
                ('email', models.EmailField(max_length=100)),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='webapp.users')),
            ],
        ),
    ]
