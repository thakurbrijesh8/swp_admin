<?php
$barcode_number = generate_barcode_number(VALUE_TWENTYFIVE, $landallotment_data['landallotment_id']);

$header_array = array();
$header_array['title'] = 'Form-1';
$header_array['department_name'] = 'Department of Industries, District Industries Centre';
$header_array['page_size'] = 'Legal';
$this->load->view('certificate/header', $header_array);
?>

<style type="text/css">
    table.CompanyDetails {
        width: 100%;
        border: 1px solid black;
        border-collapse: collapse;
        word-spacing: 2px;
    }
    td.first-column{
        width: 5.1%;
        text-align: center;
        word-spacing: 5px;
    }
    td.second-column{
        width: 39%;
        word-spacing: 10px;
    }
    td.third-column{
        width: 43%;
    }
    table.CompanyDetails td{
        height: 60px;
        padding: 3px;
    }
    td.border-none{
        border: none;
    }
</style>
<div style="font-size: 14px; text-align: center;font-weight:  bold;">ALLOTMENT LETTER</div>
<div style="font-size: 13px; text-align: left; margin-bottom: 5px;">No.DIC/15(  )/  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; Date : <td class="first-column"><?php echo convert_to_new_date_format($landallotment_data['application_date']); ?></td></div><br/>
<div style="font-size: 13px; text-align: left; margin-bottom: 5px;">To, &emsp;</div>
<div style="font-size: 13px; text-align: left; margin-bottom: 5px;">M/s. &emsp;<td class="first-column"><?php echo $landallotment_data['name_of_applicant']; ?></td></div><br/>

   
   <div style="font-size: 13px;text-align: left;margin-top: 5px;word-spacing: 5px;">&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;<b>Subject:-</b>&emsp;Allotment of Government Industrial Plot No. <?php echo $landallotment_data['plot_no']; ?>, Government Industrial Estate, <?php echo $landallotment_data['village_name']; ?>.</div><br/>

   <div style="font-size: 13px; text-align: left; margin-bottom: 5px;">Sir, &emsp;</div>


              <div style="font-size: 13px;text-align: left;margin-top: 5px;word-spacing: 9.5px;">&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Please refer to your application dated <?php echo convert_to_new_date_format($landallotment_data['application_date']); ?> for allotment of Government Industrial plot at Government Industrial Estate, <?php echo $landallotment_data['village_name']; ?> and it is to inform that you are allotted Government Industrial Plot No. <?php echo $landallotment_data['plot_no']; ?> admeasuring <?php echo $landallotment_data['govt_industrial_estate_area']; ?> square metre, subject to condition of Lease Deed which shall be binding on you for setting up of industry.</div><br/>

               <div style="font-size: 13px;text-align: left;margin-top: 5px;word-spacing: 9.5px;">&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;You are requested to make following payment:<br/>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                                      1). 30% of the premium price  =&emsp;Rs.___________<br/>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                                         &emsp; (within 15 days from date of issue of letter).<br/>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                                      2). Remaining 70% amount of premium price  =&emsp;Rs.___________
                                          (within 45 days of &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; issue of this letter).<br/>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                                      3). Demand draft Rs.5,00,000/- which will returned on payment
                                          of full premium <br/>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;price.
                </div>


              <div style="font-size: 13px;text-align: left;margin-top: 5px;word-spacing: 9px;">&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;The above payment shall be made by online payment or by collecting challan from this office.</div>

              <div style="font-size: 13px;text-align: left;margin-top: 5px;word-spacing: 9.5px;">&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Please note that if the actual area of plot is found less or more, the remaining 70% payment of plot shall be adjusted accordingly.</div><br/>

              <div style="font-size: 13px;text-align: left;margin-top: 5px;word-spacing: 9.5px;">&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;After depositing the amount in the Treasury, the challan should be submitted in this office. Delay in making payment may result in cancellation of the offer and the amount already paid shall be forfeited.</div><br/>

              <div style="font-size: 13px;text-align: left;margin-top: 5px;word-spacing: 9.5px;">&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;In case of any difficulty or clarification, you should contact this office personally before it is too late and the offer is cancelled.</div><br/>

              <div style="font-size: 13px;text-align: left;margin-top: 5px;word-spacing: 9.5px;">&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;The construction of factory building/shed in the above mentioned plot must be completed within two years, otherwise the plot allotted to you is liable to be resumed without payment of any compensation as per Lease Deed conditions. If and only if satisfactory progress is made to complete the construction of factory building/shed, request for grant of further extension to the above mentioned two years time-limit shall be considered on payment of composition fees.</div><br/>

              <div style="font-size: 13px;text-align: left;margin-top: 5px;word-spacing: 9.5px;">&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;The Lease Deed shall be executed by the allottee within one month of issue of possession letter. However, you shall be bound by all the conditions and clause of Lease Deed even if you has not executed the same. Lease Deed is available on website www.dicddd.in</div><br/>

              <div style="font-size: 13px;text-align: left;margin-top: 5px;word-spacing: 9.5px;">&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;If the allottee disagrees with the above conditions, he should inform within 15 days so that plot can be allotted to other application.</div><br/>

              <div style="font-size: 13px;text-align: left;margin-top: 5px;word-spacing: 9.5px;">&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;Kindly send the acknowledgment.</div>


<table style="margin-left: 65%;margin-top: 0px;word-spacing: 2px;">
    <tr><td class="border-none">By order of the Collector</td></tr><br/><br/><br/>
    <tr><td class="border-none">General Manager (DIC)</td></tr>
    <tr><td class="border-none">DNH&DD</td></tr>
</table><br/>

<div style="font-size: 13px;text-align: left;margin-top: 5px;word-spacing: 5px;">Copy for plot file of the applicant.</div>
<?php $this->load->view('certificate/footer', array('barcode_number' => $barcode_number)); ?>