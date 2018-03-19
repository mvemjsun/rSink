#!/usr/bin/env bash
echo "`date` Trying to stop HTTP sink at ..." >> log.txt

if [ $# -eq 0 ]
  then
    PORT="9294"
  else
    PORT="$1"
fi

PID=`lsof -i:${PORT} | grep node | grep -v grep | awk '{print $2}'` >> log.txt

if [[ -z "$PID" ]]
then
  echo "`date` No HTTP sink running." >> log.txt
else
  echo "`date` HTTP sink is running with PID $PID. Will kill now." >> log.txt
  kill -9 $PID
fi

sleep 5

PID=`lsof -i:${PORT} | grep node | grep -v grep | awk '{print $2}'` >> log.txt
if [[ -z "$PID" ]]
then
  echo "`date` HTTP sink stopped." >> log.txt
else
  echo "`date` Could not stop HTTP sink." >> log.txt
  exit 1
fi
echo "+++" >> log.txt
