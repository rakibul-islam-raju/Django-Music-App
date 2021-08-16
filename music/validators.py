import os

from django.core.exceptions import ValidationError

from mutagen.mp3 import MP3


def validate_audio(file):
    try:
        audio = MP3(file)
        if not audio:
            raise TypeError()
            file_checked = True
    except Exception as e:
        file_checked = False
    if not file_checked:
        raise ValidationError('Unsupported Audio Type.')

    valid_file_extensions = ['.mp3']
    extention = os.path.splitext(file.name)[1]
    if extention.lower() not in valid_file_extensions:
        raise ValidationError('Unsupported Audio Type.')
