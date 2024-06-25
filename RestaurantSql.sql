CREATE DATABASE RestaurantManagement;
GO

USE RestaurantManagement;
GO

CREATE TABLE Accounts (
    AccountID INT PRIMARY KEY IDENTITY(1,1),
    Username NVARCHAR(50) NOT NULL UNIQUE,
    Password NVARCHAR(255) NOT NULL,
    Role NVARCHAR(20) NOT NULL,
    PhoneNumber NVARCHAR(15) NOT NULL UNIQUE
);

CREATE TABLE Categories (
    CategoryID INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(100) NOT NULL UNIQUE,
    Description NVARCHAR(255)
);

CREATE TABLE Dishes (
    DishID INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(100) NOT NULL,
    Description NVARCHAR(500),
    Price DECIMAL(10, 2) NOT NULL,
    ImageURL NVARCHAR(500),
    CategoryID INT NOT NULL,
    FOREIGN KEY (CategoryID) REFERENCES Categories(CategoryID)
);

CREATE TABLE Orders (
    OrderID INT PRIMARY KEY IDENTITY(1,1),
    AccountID INT NOT NULL,
    OrderDate DATETIME NOT NULL,
    TotalAmount DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (AccountID) REFERENCES Accounts(AccountID)
);

CREATE TABLE OrderDetails (
    OrderDetailID INT PRIMARY KEY IDENTITY(1,1),
    OrderID INT NOT NULL,
    DishID INT NOT NULL,
    Quantity INT NOT NULL,
    UnitPrice DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID),
    FOREIGN KEY (DishID) REFERENCES Dishes(DishID)
);

CREATE TABLE Contacts (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(50) NOT NULL,
    Email NVARCHAR(50) NOT NULL,
    Phone NCHAR(10) NOT NULL,
    Message TEXT NOT NULL
);

INSERT INTO Dishes (Name, Description, Price, ImageURL, CategoryID) VALUES
('Nigirizushi', 'Nigirizushi cũng là một trong các loại sushi truyền thống ở Nhật Bản. Cơm sushi được nắm ở phía dưới, phía trên đặt một miếng sashimi như cá hồi, cá ngừ, bạch tuộc… Đôi khi trứng cuộn, lươn hay thanh cua cũng được đặt lên kèm theo một miếng rong biển nhỏ cuộn lại.', 1560000, 'https://japanduhoc.com/wp-content/uploads/2020/10/1602597117_499_Cac-loai-Sushi-ngon-nhat-the-gioi-va-cach-an.jpg', 1),
('Gunkanmaki', 'Gunkanmaki còn được gọi là sushi tàu chiến vì hình dạng của nó. Người ta nắm một nắm cơm, bọc rong biển khô xung quanh và phía trên chứa đầy bắp và mayonnaise, trứng cá, trứng tôm, hoặc… natto.', 1560000, 'https://japanduhoc.com/wp-content/uploads/2020/10/1602597119_550_Cac-loai-Sushi-ngon-nhat-the-gioi-va-cach-an.jpg', 1),
('Oshizushi', 'Oshizushi là sushi ép khuôn. Cơm sushi được đặt trong một cái khuôn hình chữ nhật, đặt một miếng lươn, cá hồi, trứng,… lên trên rồi đè, ép chặt khuôn lại.', 1560000, 'https://japanduhoc.com/wp-content/uploads/2020/10/1602597124_849_Cac-loai-Sushi-ngon-nhat-the-gioi-va-cach-an.jpg', 1),
('Uramaki', 'Uramaki là loại sushi mà thành phẩm sẽ là cơm sussi đươc lăn với vừng, mè ở bên ngoài, bên trong là rong biển và nhân đa dạng như các loại sushi khác. Uramaki còn được gọi là “cuốn ngược vào trong".', 1560000, 'https://japanduhoc.com/wp-content/uploads/2020/10/1602597127_795_Cac-loai-Sushi-ngon-nhat-the-gioi-va-cach-an.jpg', 1)

DROP TABLE IF EXISTS OrderDetails;
DROP TABLE IF EXISTS Orders;
GO

CREATE TABLE TableBookings (
    BookingID INT PRIMARY KEY IDENTITY(1,1),
    CustomerID INT NOT NULL,
    CustomerName NVARCHAR(100) NOT NULL,
    NumberOfPeople INT NOT NULL,
    BookingDate DATE NOT NULL,
    BookingTime TIME NOT NULL,
    Notes NVARCHAR(255)
);
GO

INSERT INTO TableBookings (CustomerID, CustomerName, NumberOfPeople, BookingDate, BookingTime, Notes) VALUES
(1, 'Nguyễn Văn A', 4, '2024-07-01', '18:30:00', 'Kỷ niệm ngày cưới'),
(2, 'Trần Thị B', 2, '2024-07-02', '19:00:00', 'Sinh nhật bạn gái'),
(3, 'Lê Văn C', 5, '2024-07-03', '20:00:00', 'Tiệc công ty'),
GO
