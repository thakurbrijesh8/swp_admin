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
        <div style="font-size: 14px; text-align: center;">Zone Information</div>
        <div style="font-size: 14px; text-align: center;">Form of Zone Information</div>
        <br/>

        <div style="font-size: 14px; text-align: left; margin-bottom: 12px;margin-left:  290px;">From :-&nbsp;<?php  echo  ($zone_data['name_of_applicant']); ?><div style="margin-left:  50px;margin-top: -20px;border-bottom: 1px solid black;width: 350px; ">&emsp;</div></div>
        <div style="font-size: 14px; text-align: left; margin-bottom: 12px;margin-left:  270px;">Address :-&nbsp;<?php  echo  ($zone_data['address']); ?><div style="margin-left:  70px;margin-top: -20px;border-bottom: 1px solid black;width: 350px; ">&emsp;</div></div>
        <div style="font-size: 14px; text-align: left; margin-bottom: 12px;margin-left:  250px;">Mobile No :- <?php  echo  ($zone_data['mobile_no']); ?>&nbsp;<div style="margin-left:  90px;margin-top: -20px;border-bottom: 1px solid black;width: 350px; ">&emsp;</div></div>
        <div style="font-size: 14px; text-align: left; margin-bottom: 12px;margin-left:  290px;">Date :-&nbsp;<div style="margin-left:  50px;margin-top: -20px;border-bottom: 1px solid black;width: 350px; ">&emsp;<?php echo convert_to_new_date_format($zone_data['created_time']); ?></div></div>

        <div class="row">
            <div class="form-group col-sm-6">
               To,<br>
                The Chief Town Planner,<br>
                Town & Country Planning Dept.,<br>
                Daman.
            </div>

             <div style="font-size: 14px;margin-top: 20px;line-height: 1.6;">Sub:- Regarding providing zone information </div>

        </div>
        <div style="font-size: 14px;margin-top: 20px;">Respected Sir,</div><br/>
        <div style="font-size: 14px;margin-top: 5px;line-height: 1.6;">I the undersigned, owner of the land bearing Survey No. <b><?php echo $zone_data['survey_no']; ?></b> PTS No.  <b><?php echo $zone_data['pts_no']; ?></b> at village <b><?php echo $zone_data['village']; ?></b>  Daman, request you to provide Zone information of above said land. We are ready to pay the necessary fees for the information if any.</div>



        <div style="font-size: 14px;margin-top: 20px;line-height: 1.6;">
        Thanking You
        <br/>

        </div>
   
        <div style="font-size: 14px;margin-top: 20px;line-height: 1.6;">          
       Your faithfully
        </div>
        <div style="font-size: 14px;margin-top: 20px;line-height: 1.6;">
            <img src="<?php echo base_url(); ?>documents/zone/<?php echo  $zone_data['signature']; ?>" height="100px" width="100px">
        </div>
       
</body>
</html>