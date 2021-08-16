import math
from django import template

register = template.Library()

@register.filter
def length_formatter(time):
    time = int(time) 
    minuite = math.floor((time%3600)/60) 
    secound = math.floor(time%60) 
    if secound < 10:
        secound = f'0{secound}'
    return f'{minuite}:{secound}'
