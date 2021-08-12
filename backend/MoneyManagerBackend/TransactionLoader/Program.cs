using CsvHelper;
using CsvHelper.Configuration;
using System;
using System.Globalization;
using System.IO;

namespace TransactionLoader
{
    class Program
    {
        static void Main(string[] args)
        {

            var config = new CsvConfiguration(CultureInfo.InvariantCulture)
            {
                PrepareHeaderForMatch = args => args.Header.ToLower(),
            };

            using (var reader = new StreamReader("C:\\Users\\phili\\Downloads\\csv15100.csv"))
            using (var csv = new CsvReader(reader, config)) // CultureInfo.InvariantCulture))
            {
                foreach (var record in csv.GetRecords<Transaction>())
                {
                    Console.WriteLine($"{record.AccountNumber} - {record.Date} - {record.Description1} - {record.Description2} - {record.AmountCad}");
                    SqliteDataAccess.SaveTransaction(record);
                }
            }
        }
    }
}
