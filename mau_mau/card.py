from dataclasses import dataclass


@dataclass(unsafe_hash=True)
class Card:
    x: int
    y: int
