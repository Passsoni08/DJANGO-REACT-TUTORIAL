from django.db import models
from django.contrib.auth.models import User

# define the python version of our models
# specify the type of fields we want to store on this model


class Note(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(
        User, on_delete=models.CASCADE,
        related_name="notes"
        )
    # author especifica quem fez esse note
    # foreing key can link something with some data that belongs to it
    # pode-se usar foreing key de diferentes maneira, nesse caso é para
    # juntar diferentes pedaços of data
    # on_delete é para caso o User seja apagado, apagar todos os notes dele

    def __str__(self):
        return self.title
