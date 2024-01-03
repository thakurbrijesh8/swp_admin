<html>
    <head>
        <title>Form-1</title>
        <style type="text/css">
            body {
                font-family: serif;
                font-size: 14px;
            }
            table.CompanyDetails, td {
                width: 100%;
                border: 1px solid black;
                border-collapse: collapse;
                word-spacing: 2px;
            }
            table.newTable, td {
                width: 100%;
                border: 1px solid #D3D3D3;
                border-collapse: collapse;
            }
            td.new-column{
                width: 25%;
                text-align: center;
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
        <div style="font-size: 14px; text-align: center;">Seller of Lease</div>
        <div style="font-size: 14px; text-align: center; margin-top: 10px;">Application format for Permission of Sales/Transfer of Lease rights of Government Industrial plots</div>
        <br/>
        <div class="row">
            <div class="form-group col-sm-6">
                To<br>
                The General Manager,<br>
                District Industries Centre,<br>
                DNH&DD<br>
                Silvassa,
            </div>
        </div>
        <br/>
        <table class="CompanyDetails">
            <tr>
                <td class="first-column">1 </td>
                <td class="second-column">Name of Applicant:</td>
                <td class="third-column">
                    <?php echo $seller_data['name_of_applicant']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">2 </td>
                <td class="second-column">Plot No:</td>
                <td class="third-column">
                    <?php echo $seller_data['plot_no']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">3 </td>
                <td class="second-column">Survey No:</td>
                <td class="third-column">
                    <?php echo $seller_data['survey_no']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">4 </td>
                <td class="second-column">Government Industrial Estate Area:</td>
                <td class="third-column">
                    <?php echo $seller_data['govt_Industrial_estate_area']; ?>
                </td>
            </tr>
            
            
        </table>
    
    
        <br />
    
        <table style="margin-left: 475px;">
            <tr><td class="border-none"><img src="<?php echo SELLER_DOC_PATH; ?><?php echo $seller_data['signature']; ?>" height="100px" width="100px"></td></tr>
        </table>
        <table style="margin-left: 70%;margin-top: 0px;word-spacing: 2px;">
            <tr><td class="border-none">Signature</td></tr>
        </table>
    
</body>
</html>