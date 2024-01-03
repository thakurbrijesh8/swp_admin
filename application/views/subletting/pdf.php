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
                margin-bottom: 0px;
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
                height: 50px;
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
    
         <div style="font-size: 14px; text-align: left; margin-bottom: 12px;margin-left:  250px;">From: M/s &nbsp;<div style="margin-left:  90px;margin-top: -20px;border-bottom: 1px solid black;width: 350px; ">&emsp;</div></div>
        <div style="font-size: 14px; text-align: left; margin-bottom: 12px;margin-left:  270px;">Plot No. &nbsp;<div style="margin-left:  70px;margin-top: -20px;border-bottom: 1px solid black;width: 350px; ">&emsp;</div></div>
        <div style="font-size: 14px; text-align: left; margin-bottom: 12px;margin-left:  250px;">Survey No&nbsp;<div style="margin-left:  90px;margin-top: -20px;border-bottom: 1px solid black;width: 350px; ">&emsp;</div></div>
        <div style="font-size: 14px; text-align: left; margin-bottom: 12px;margin-left:  250px;">Govt. Industrial Estate,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div style="margin-left:  90px;margin-top: -20px;border-bottom: 1px solid black;width: 350px; ">&emsp;</div></div>
        <div style="font-size: 14px; text-align: left; margin-bottom: 12px;margin-left:  290px;">Date :-&nbsp;<div style="margin-left:  50px;margin-top: -20px;border-bottom: 1px solid black;width: 350px; ">&emsp;<?php echo convert_to_new_date_format($subletting_data['created_time']); ?></div></div>
        <div class="row">
            <div class="form-group col-sm-6">
                To,<br>
                The General Manager,<br>
               District Industries Centre,<br>
                DNH&DD,<br>
                Silvassa.

            </div>
        </div>
        <div style="font-size: 14px; text-align: center; margin-top: 10px;text-decoration: underline;">Subject : Permission for sub-letting of premises on Plot No……, Survey No……… admeasuring ……… square metre, Government Industrial Estate, ….………. In favour of M/s…………………….</div>
        <br/>
        <table class="CompanyDetails">
            <tr>
                <td class="first-column">1.</td>
                <td class="second-column">Name of Sub-letting Applicant</td>
                <td class="third-column">
                    <?php echo $subletting_data['name_of_applicant']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">2.</td>
                <td class="second-column">State / UT :-</td>
                <td class="third-column">
                    <?php echo $subletting_data['state']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">3.</td>
                <td class="second-column">District  :-</td>
                <td class="third-column">
                    <?php echo $subletting_data['district']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">4.</td>
                <td class="second-column">Taluka :-</td>
                <td class="third-column">
                    <?php echo $subletting_data['taluka']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column">5. </td>
                <td class="second-column">Village :-</td>
                <td class="third-column">
                    <?php echo $subletting_data['village']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column" style="height: 30px;">6.  </td>
                <td class="second-column">Date :-</td>
                <td class="third-column">
                    <?php echo $subletting_data['date']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column" style="height: 30px;">7. </td>
                <td class="second-column">Plot No :-</td>
                <td class="third-column">
                    <?php echo $subletting_data['plot_no']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column" style="height: 30px;">8. </td>
                <td class="second-column">Survey No :-</td>
                <td class="third-column">
                    <?php echo $subletting_data['survey_no']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column" style="height: 30px;">9.  </td>
                <td class="second-column">Admeasuring in square meter :-</td>
                <td class="third-column">
                    <?php echo $subletting_data['admeasuring']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column" style="height: 30px;">10. </td>
                <td class="second-column">Government Industrial Estate Area) :-</td>
                <td class="third-column">
                    <?php echo $subletting_data['estate_area']; ?>
                </td>
            </tr>
            <tr>
                <td class="first-column" style="height: 30px;">11. </td>
                <td class="second-column">Name of Manufacturing/Servicing Establish :-</td>
                <td class="third-column">
                    <?php echo $subletting_data['name_of_manufacturing']; ?>
                </td>
            </tr>
           
        </table>
        <br />
       
        <div style="font-size: 14px; text-align: right; margin-bottom: 5px;"><img src="<?php echo base_url(); ?>documents/subletting/<?php echo $subletting_data['signature']; ?>" height="80px" width="80px"></div>
        <div style="font-size: 14px; text-align: right; margin-bottom: 0px;">Signature of Applicant</div>
</html>


