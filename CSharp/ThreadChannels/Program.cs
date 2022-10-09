// See https://aka.ms/new-console-template for more information
using System.Threading.Channels;

var c = Channel.CreateUnbounded<int>();

_ = Task.Run(async delegate
{
    for (int i = 0; ; i++)
    {
        await Task.Delay(1000);
        c.Writer.TryWrite(i);
    }
});

while (true) {
    var a = Task.Run(async delegate {
        Console.WriteLine($"Consumer a: { await c.Reader.ReadAsync()}");
    });
    var b = Task.Run(async delegate {
        Console.WriteLine($"Consumer b: { await c.Reader.ReadAsync()}");
    });
    
    Task.WaitAll(a, b);
}