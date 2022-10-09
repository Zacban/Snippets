public class Publisher {
    public static void SendNotificationSync() {
        Task.Delay(1000).GetAwaiter().GetResult();
        Console.WriteLine("Task Done");
    }
}