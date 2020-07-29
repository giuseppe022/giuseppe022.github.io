CREATE TABLE `images` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `file_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
 `title` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
 `uploaded_on` datetime NOT NULL,
 `status` tinyint(1) NOT NULL DEFAULT 1 COMMENT '1=Active | 0=Inactive',
 PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;