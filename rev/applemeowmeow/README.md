# AppleMeowMeow

**Category:** Rev  **Author:** nukoneZ

> "Evil doesn't vanish... it only hides in code."
>
> I was preparing a special gift for everyone to celebrate this Halloween, something unique, something fun...
> But before I could finish, it was stolen by a shadowy group calling themselves APT.
> They tampered with it, twisted its insides, and left behind a cryptic program, something that whispers in the dark, something alive.
>
> Now the code itself seems... cursed.
> Every attempt to retrieve my gift only leads deeper into the labyrinth they've left behind.
>
> Can you reverse their creation, unravel its secrets, and help me recover what was once meant to bring joy, before Halloween night falls and it becomes something far more sinister?
>
> Beware... the gift might be watching you too.

Handout: `AppleMeowMeow.zip`. The `AppleMeowMeow/` folder is the same thing unzipped: `AppelMeowMeow.exe`, `Pumpkin.html.enc` and `checksum.txt`.

## Solution

No author writeup or flag was kept for this one. The job is to reverse the Windows binary's encryption and decrypt `Pumpkin.html.enc` back into the "gift". `checksum.txt` holds a 64-hex digest to check the result against.
