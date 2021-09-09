import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";

import { check_page_access } from "../../modules/functions";

import DataTableSearch from "../../components/dataTableSearch/DataTableSearch";
import LeadsForm from "../../components/leadsForm/LeadsForm";

import "./Leads.css";


/*

<select class="form-control" name="provenance">
	<option value="">-</option>
	<?foreach($dispositifs as $idDispositif => $dispositif){?>
		<?
		$selectedProvenance = '';
		if ($_SESSION['adminleads']['provenance'] == $idDispositif) :
			$selectedProvenance = ' selected="selected"';
		endif;
		?>
	    <option  <?=$selectedProvenance?> value="<?=$idDispositif?>" ><?=$dispositif?></option>
	<?}?>
</select>

while($dispositif = $dispositifsReq->fetch(PDO::FETCH_ASSOC))
	$dispositifs[$dispositif['id']] = $dispositif['nom'];

----------------------------------------------------------------------------------------------------

<select class="form-control" name="destinataire">
	<option value="">-</option>
	<?foreach($destinataires as $idDestinataire => $destinataireTmp){?>
	    <?
		$selectedDestinataire = '';
		if ($_SESSION['adminleads']['destinataire'] == $idDestinataire) :
				$selectedDestinataire = ' selected="selected"';
		endif;
		?>
	    <option  <?=$selectedDestinataire?> value="<?=$idDestinataire?>" ><?=$destinataireTmp?></option>
	<?}?>
</select>

while($destinataireTmp = $destinatairesReq->fetch(PDO::FETCH_ASSOC))
	$destinataires[$destinataireTmp['id']] = $destinataireTmp['nom'];

*/


function	Leads() {
	const	history	= useHistory();

	if (check_page_access(true) === false)
		history.push("/");


	const	[leadsList, setLeadsList]			= useState([]);	
	const	[destinataires, setDestinataires]	= useState([]);
	const	[provenances, setProvenances]		= useState([]);

	const	[submit, setSubmit]		= useState(false);
	const	[subData, setSubData]	= useState([]);

	useEffect(() => {
		Axios.get("/api/leads/readDestinataires")
			.then((response) => {
				setDestinataires(response.data);
			});
		Axios.get("/api/leads/readProvenances")
			.then((response) => {
				setProvenances(response.data);
			});
		if (submit) {
			Axios.get("/api/leads/readQuery", { params : { subData }, })
				.then((response) => {
					setLeadsList(response.data);
				});
		}
	}, [submit, subData]);

	return (
		<div>
			<h1> LEADS LIST </h1>

			<LeadsForm
				onClick={({ ...data }) => {
					setSubmit(data?.submit);
					setSubData(data);
				}}
				destinataires={destinataires}
				provenances={provenances}
			/>

			<br />

			<b> total: {leadsList.length} </b>

			<br />

			{ submit && <DataTableSearch data={leadsList}></DataTableSearch> }
		</div>
	);
}

export default Leads;