ESX = nil;

Citizen.CreateThread(function()
	while ESX == nil do
		TriggerEvent("esx:getSharedObject", function(obj)
			ESX = obj;
		end);
		Citizen.Wait(0);
	end;
end);

RegisterNetEvent("adminpanel:edituser");
AddEventHandler("adminpanel:edituser", function(steamid, reason)
	local player = PlayerId();

	ESX.TriggerServerCallback("adminpanel:getSteamid", function(pstid)
		
        print("steamid" .. steamid);
        print("reason" .. reason);
        print("pstid" .. pstid);
        if steamid == pstid then
            TriggerServerEvent('adminpanel:dropPlayer', reason)
        end;
        


	end);

	
end);
