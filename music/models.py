from music.validators import validate_audio
from music.helpers import get_audio_length
from django.db import models


class Album(models.Model):
    name = models.CharField(max_length=500)

    def __str__(self):
        return self.name


class Music(models.Model):
    title = models.CharField(max_length=500)
    artist = models.CharField(max_length=500)
    album = models.ForeignKey(Album, on_delete=models.SET_NULL, blank=True, null=True)
    time_length = models.DecimalField(blank=True, max_digits=8, decimal_places=2)
    audio_file = models.FileField(upload_to='musics', validators=[validate_audio])
    cover_image = models.ImageField(upload_to='cover_images/')

    def save(self, *args, **kwargs):
        if not self.time_length:
            audio_length = get_audio_length(self.audio_file)
            self.time_length = audio_length
        return super().save(*args, **kwargs) # Call the real save() method

    def __str__(self):
        return self.title
    