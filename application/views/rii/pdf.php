<html>
    <head>
        <title></title>
        <style type="text/css">
            body {
                font-family: serif;
                font-size: 12px;
            }
            table.CompanyDetails, td {
                width: 100%;
                border: 1px solid black;
                border-collapse: collapse;
                word-spacing: 2px;
            }
            td.first-column{
                width: 5.1%;
                text-align: center;
            }
            td.common-first-column{
                width: 3.9%;
                text-align: center;
            }
            td.second-column{
                width: 39%;
            }
            td.common-second-column{
                width: 25%;
            }
            td.common-third-column{
                width: 43%;
            }
            td.third-column{
                width: 43%;
            }
            td.table-first-column{
                width: 5.45%;
                text-align: center;
            }
            td.table-second-column{
                width: 25%;
            }
            td.table-third-column{
                width: 25%;
            }
            td.table-forth-column{
                width: 20%;
            }
            td.table-fifth-column{
                width: 25%;
            }
            td.single-second-column{
                width: 94%;
            }
            table.CompanyDetails td{
                height: 60px;
                padding: 3px;
            }
            td.declaration-number{
                border: none;
                width: 5%;
                vertical-align: text-top;
            }
            td.declaration{
                border: none;
                width: 100%;
            }
            td.border-none{
                border: none;
            }
        </style>
    </head>
    <body>
        <?php
            $treadeArray = $this->config->item('trade_type_array');
            $reportArray = $this->config->item('report_type_array');
            $talukaArray = $this->config->item('taluka_array');
        ?>
        <div style="font-size: 14px; text-align: center; margin-top: 10px;">Reporting/Informing/Intimation to Legal Metrology Office</div>
        <br/>
        <table class="CompanyDetails">
            <tr>
                <td class="first-column">1 </td>
                <td class="second-column">Name of User/ Premises:</td>
                <td class="third-column">
                    <?php echo $rii_data['user_name']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">2 </td>
                <td class="second-column">District:</td>
                <td class="third-column">
                    <?php echo $talukaArray[$rii_data['district']]; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">3 </td>
                <td class="second-column">Address:</td>
                <td class="third-column">
                    <?php echo $rii_data['address']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">4 </td>
                <td class="second-column">Trade:</td>
                <td class="third-column">
                    <?php echo $treadeArray[$rii_data['trade']]; ?>
                </td>
        </tr>
        <tr>
            <td class="first-column">5 </td>
            <td class="second-column">Report/Intimate/Inform:</td>
            <td class="third-column">
                <?php echo $reportArray[$rii_data['reporting']]; ?>
            </td>
        </tr>
    </table>
        
</body>
</html>