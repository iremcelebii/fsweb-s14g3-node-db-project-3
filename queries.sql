-- Multi-Table Sorgu Pratiği

-- Tüm ürünler(product) için veritabanındaki ProductName ve CategoryName'i listeleyin. (77 kayıt göstermeli)

        SELECT ProductName, CategoryName FROM Product
        JOIN Category ON Product.CategoryId=Category.Id

-- 9 Ağustos 2012 öncesi verilmiş tüm siparişleri(order) için sipariş id'si (Id) ve gönderici şirket adını(CompanyName)'i listeleyin. (429 kayıt göstermeli)

        SELECT Id,CompanyName FROM [Order]
        JOIN Shipper ON [Order].ShipVia=Shipper.Id
        WHERE [Order].OrderDate<"2012-08-09"

-- Id'si 10251 olan siparişte verilen tüm ürünlerin(product) sayısını ve adını listeleyin. ProdcutName'e göre sıralayın. (3 kayıt göstermeli)

        SELECT ProductName, Quantity FROM [OrderDetail]
        JOIN Product ON [OrderDetail].ProductId=Product.Id
        WHERE [OrderDetail].OrderId=10251
        ORDER BY Product.ProductName 

-- Her sipariş için OrderId, Müşteri'nin adını(Company Name) ve çalışanın soyadını(employee's LastName). Her sütun başlığı doğru bir şekilde isimlendirilmeli. (16.789 kayıt göstermeli)

        SELECT CompanyName as "Company Name",  LastName as "employee's LastName " FROM [Order]
        JOIN Customer ON [Order].CustomerId=Customer.Id
        JOIN Employee ON [Order].EmployeeId=Employee.Id