## What's the outcome of this task?

e.g. `X: 15 Y: -1 Direction: South`

- Last position of MAQE Bot
- Direction of MAQE Bot

Sample of Test Data:
```
W5RW5RW2RW1R
RRW11RLLW19RRW12LW1
LLW100W50RW200W10
LLLLLW99RRRRRW88LLLRL
W55555RW555555W444444W1
```

## What are the rules?

- R: Turn 90 degree to the right of MAQE Bot (clockwise)
- L: Turn 90 degree to the left of MAQE Bot (counterclockwise)
- W(N): Walk straight for N point(s) **_where N can be any positive integers_**. For example, W1 means walking straight for 1 point.

## Known conditions

- MAQE Bot starts at the position (X, Y) of 0, 0
- MAQE Bot is facing up North
- MAQE Bot could turn L or R more than once
- No limit for number of walking steps, if it's integers.