using System;
using System.Text;
using System.Net;

public class Program
{
    static void Main(string[] args)
    {
        string hostName = Dns.GetHostName();
        Console.WriteLine("Host name: {0}", hostName);

       //Dns.GetHostByName(hostName).AddressList[0].ToString();
        string IP = Dns.GetHostByName(hostName).AddressList[0].MapToIPv4().ToString();
        Console.WriteLine("IP: {0}", IP);
    }
}
