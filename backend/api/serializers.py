from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User  # modelo que queremos serializer
        fields = ["id", "username", "password"]
        # all the fields we want to serializer when we're accepting a new user
        # and when we're returning a new user
        extra_kwargs = {"password": {"write_only": True}}
        # aceitamos a senha mas não retornamos a senha quando estiver
        # dando informação sobre um usuario

    # criando um metodo que vai ser chamado
    # quando estiver criando um new user que ja passaram (validated_data)
    # segundo os parametros do UserSerializer
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["id", "title", "content", "created_at", "author"]
        extra_kwargs = {"author": {"read_only": True}}
        # should be able to read who the author is
        # shouldn't be able to write who the author is
