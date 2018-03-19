#!/usr/bin/env bash
echo "+++" >> log.txt
echo "`date` Starting HTTP sink." >> log.txt
cd ~/rSink
node main.js &