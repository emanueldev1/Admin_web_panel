-- get ESX shared obj
-- ESX = nil
-- -- no funciona si quieres ayudar dime como hacerlo
-- -- este evento es llamado desde el javascript y se ejecuta en el lua
-- -- emit("adminpanel:edituser", -1, steamid, `the administrator ${username} has edited your user with the following data the previous data was (job = ${resultados.job}, job_grade = ${resultados.job_grade}, money = ${resultados.money}, bank = ${resultados.bank}, group = ${resultados.group}) the current data is (job = ${job}, job_grade = ${job_grade}, money = ${money}, bank = ${bank}, group = ${group})`);

-- Citizen.CreateThread(function()
--     while ESX == nil do
--         TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)
--         Citizen.Wait(0)
--     end
-- end)

ESX = nil

TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)



ESX.RegisterServerCallback('adminpanel:getSteamid',function(source, cb)	
	local _source = source
	local identifier = ""

    identifier = ESX.GetPlayerFromId(_source).identifier

	cb(identifier)

end)

--server event
RegisterServerEvent('adminpanel:dropPlayer')
AddEventHandler('adminpanel:dropPlayer', function(message)
    local _source = source
    DropPlayer(_source, message)

end)
