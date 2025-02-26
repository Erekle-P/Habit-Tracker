from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Habit, Task

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class HabitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Habit
        fields = "__all__"
        # Mark 'user' as read-only so that it is set automatically in perform_create
        read_only_fields = ("user",)

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = "__all__"
        # Mark 'user' as read-only so that it is set automatically in perform_create
        read_only_fields = ("user",)
