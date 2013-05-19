<?php

class API
{
	/*
	 * The database
	 */
	private $db;
	
	/*
	 * The response
	 */
	private $response;
	
	public function __construct()
	{
		try
		{
			$this->db = new PDO('sqlite:db/le-surtaxeur.db');
		}
		catch(Exception $e)
		{
			die('Erreur : ' . $e->getMessage());
		}
	}
	
	/*
	 * Call the method requested if it exists
	 */
	public function request()
	{
		if(isset($_GET['method']) && !empty($_GET['method']))
		{
			if(method_exists($this, $_GET['method']))
			{
				$this->response = $this->$_GET['method']();
			}
		}
		
		if($this->response == NULL)
		{
			header('HTTP/1.1 404 Not Found');
			return $this->response;
		}
		else
		{
			return $this->response;
		}
	}
	
	/*
	 * Get a SMS from the database
	 * To do : Add the possibility of multiple responses (and get a random one)
	 */
	public function getsms()
	{
		if(isset($_GET['code']) && !empty($_GET['code'])
			&& isset($_GET['number']) && !empty($_GET['number']))
		{
			$req = $this->db->prepare('SELECT id, response, code, number, createdAt, updatedAt, verified
										FROM responses
										WHERE code = :code AND number = :number');
			$req->execute(array('code' => $_GET['code'], 'number' => $_GET['number']));
			
			$response = NULL;
			while($data = $req->fetch(PDO::FETCH_OBJ))
			{
				$response = $data;
			}
			
			if($response == NULL)
			{
				$response = array('err' => "Il n'y a pas de r&eacute;ponse pour ce code et ce num&eacute;ro");
			}
			
			return json_encode($response);
		}
	}
	
	/*
	 * Call the pony
	 */
	public function pony()
	{
		$pony = array('pony' => 'Tiens un poney !');
		return json_encode($pony);
	}
}