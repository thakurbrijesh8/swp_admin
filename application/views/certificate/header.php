<html>
    <head>
        <title><?php echo isset($title) ? $title : ''; ?></title>
        <style type="text/css">
            @page {
                margin: 20px;
            }
            body {
                font-family: serif;
                font-size: 14px;
            }
            .page-border{
                border: 2px solid red;
                padding: 10px;
                height: 100%;
            }
            .table-header {
                width: 100%;
            }
            .header-title {
                font-weight: bold;
                font-size: 16px;
            }
            .f-w-b{
                font-weight: bold;
            }
            .color-nic-blue{
                color: #0E4D92;
            }
            .footer-title{
                font-size: 10px;
            }
            .t-a-c{
                text-align: center;
            }
        </style>
    </head>
    <body>
    <watermarkimage src="images/emblem-dark.png" alpha="0.03" />
    <div class="page-border">
        <table class="table-header">
            <tr>
                <td style="width: 60px;">
                    <img src="images/emblem-dark.png" style="width: 50px;"> 
                </td>
                <td style="vertical-align: top;">
                    <div class="header-title">U.T. Administration of</div>
                    <div class="header-title">Dadra and Nagar Haveli and Daman and Diu</div>
                    <div class="header-title"><?php echo isset($department_name) ? $department_name : ''; ?></div>
                    <div class="header-title"><?php echo isset($district) ? $district : ''; ?></div>
                </td>
                <td style="text-align: right;">
                    <img src="images/ddd.png" style="width: 90px;"> 
                </td>
            </tr>
        </table>
        <hr style="color: red;">
        <div style="margin-top: 10px; <?php echo $page_size == 'A4' ? 'height: 79.9%' : ($page_size == 'Legal' ? 'height: 83.2%' : ''); ?>">