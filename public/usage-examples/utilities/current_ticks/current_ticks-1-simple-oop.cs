﻿using SplashKitSDK;

namespace CurrentTicksExample
{
    public class Program
    {
        public static void Main()
        {
            SplashKit.WriteLine("Starting tick capture...");

            // Get the ticks before delay
            uint ticksBefore = SplashKit.CurrentTicks();
            SplashKit.WriteLine("Ticks before any delay: " + ticksBefore);

            // Delay for 1 second (1000 milliseconds) and capture ticks
            SplashKit.Delay(1000);
            uint ticksAfter1s = SplashKit.CurrentTicks();
            SplashKit.WriteLine("Ticks after 1 second: " + ticksAfter1s);

            // Delay for 2 more seconds (2000 milliseconds) and capture ticks
            SplashKit.Delay(2000);
            uint ticksAfter2s = SplashKit.CurrentTicks();
            SplashKit.WriteLine("Ticks after 2 more seconds (3 seconds total): " + ticksAfter2s);

            // Delay for 4 more seconds (4000 milliseconds) and capture ticks
            SplashKit.Delay(4000);
            uint ticksAfter4s = SplashKit.CurrentTicks();
            SplashKit.WriteLine("Ticks after 4 more seconds (7 seconds total): " + ticksAfter4s);

            // Show the difference in ticks at each capture point
            uint diff1s = ticksAfter1s - ticksBefore;
            uint diff2s = ticksAfter2s - ticksAfter1s;
            uint diff4s = ticksAfter4s - ticksAfter2s;

            SplashKit.WriteLine("Ticks passed in the first second: " + diff1s);
            SplashKit.WriteLine("Ticks passed in the next 2 seconds: " + diff2s);
            SplashKit.WriteLine("Ticks passed in the final 4 seconds: " + diff4s);
        }
    }
}
