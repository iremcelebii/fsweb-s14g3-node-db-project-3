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

        SELECT [Order].Id,CompanyName as "Company Name",  LastName as "employee's LastName " FROM [Order]
        JOIN Customer ON [Order].CustomerId=Customer.Id
        JOIN Employee ON [Order].EmployeeId=Employee.Id

- Her gönderici tarafından gönderilen gönderi sayısını bulun.

        SELECT ShipperName, COUNT(ProductID), SUM(Quantity)  FROM [Orders]
        JOIN [OrderDetails] ON [Orders].OrderID=[OrderDetails].OrderID
        JOIN [Shippers] ON [Orders].ShipperID=[Shippers].ShipperID
        GROUP BY [Shippers].ShipperName

- Sipariş sayısına göre ölçülen en iyi performans gösteren ilk 5 çalışanı bulun.

        SELECT FirstName, LastName, COUNT(OrderID) AS "Sipariş Sayısı" FROM  [Orders]
        RIGHT JOIN [Employees]  ON [Employees].EmployeeID=[Orders].EmployeeID
        GROUP BY [Employees].EmployeeID 
        ORDER BY COUNT(OrderID) DESC
        LIMIT 5


        SELECT FirstName, LastName, SUM (Quantity) AS "Sipariş Sayısı"  FROM  [Orders]
        JOIN [Employees]  ON [Employees].EmployeeID=[Orders].EmployeeID
        JOIN [OrderDetails] ON [Orders].OrderID=[OrderDetails].OrderID
        GROUP BY [Employees].EmployeeID 
        ORDER BY SUM([OrderDetails].Quantity) DESC
        LIMIT 5

- En az gelir getiren kategoriyi bulun.

        SELECT  [Categories].CategoryID,CategoryName, SUM (Quantity*Price)  FROM [OrderDetails]
        JOIN [Products] ON [OrderDetails].ProductID=[Products].ProductID
        JOIN [Categories] ON [Products].CategoryID=[Categories].CategoryID
        GROUP BY CategoryName
        ORDER BY SUM (Quantity*Price)
        LIMIT 5

- En çok siparişi olan müşteri ülkesini bulun.
EN ÇOK SİPARİŞİ OLAN ÜLKE
        SELECT Country, COUNT (Country) FROM [Orders]
        JOIN [Customers] ON [Orders].CustomerID=[Customers].CustomerID
        GROUP BY Country
        ORDER BY COUNT (Country) DESC
        LIMIT 1

EN ÇOK SİPARİŞİ OLAN MÜŞTERİNİN ÜLKESİ
        SELECT Country, OrderID, COUNT ([Customers].CustomerID) FROM [Orders]
        JOIN [Customers] ON [Orders].CustomerID=[Customers].CustomerID
        GROUP BY 	[Customers].CustomerID
        ORDER BY COUNT ([Customers].CustomerID) DESC
        LIMIT 1