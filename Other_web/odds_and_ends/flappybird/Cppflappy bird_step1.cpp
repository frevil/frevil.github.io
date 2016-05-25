#include<stdio.h>
#include<conio.h>
#include<stdlib.h>
#include<windows.h>
#include<time.h>
#include<graphics.h>
int x=210,y,v,G=2,m=1,f,tx[4],high[4];
float k;
void back_move()
{
	setlinestyle(PS_SOLID, 80);
	setfillcolor(WHITE);
	for(int i=0;i<=3;i++)
	{
	solidrectangle(tx[i]-40, 0, tx[i]+40, high[i]);
	solidrectangle(tx[i]-40, high[i]+120, tx[i]+40, 600);
	if(tx[i]<=-40)tx[i]+=800,high[i]=rand()%250+80;
	tx[i]-=6;	
	}
	for(int i1=0;i1<=3;i1++)
	{
	solidrectangle(tx[i1]-40, 0, tx[i1]+40, high[i1]);
	solidrectangle(tx[i1]-40, high[i1]+120, tx[i1]+40, 600);
	}
}
///////////////////////////////////////////////////////////////////
 DWORD WINAPI MyThread1(PVOID pvParam)
{
loadimage(0,"E:\\Í¼Æ¬\\flappybird\\10000945345346.jpg",640,480,BLACKNESS );
int time=0;
while(1)
{
//cleardevice();
v+=(G-f);
y=(y+v)%600;
IMAGE bd;
//
//putimage(0,0,&bd);
back_move();
settextcolor(RGB(x*255/640,y*255/480,100));
//setwritemode(R2_XORPEN);
solidrectangle(x-10, y-10, x+10, y+10);
Sleep(50);
solidrectangle(x-10, y-10, x+10, y+10);
}//¶ÔÓ¦while
return 0;	
}
///////////////////////////////////////////////////////////////////
DWORD WINAPI MyThread2(PVOID pvParam)
{
while(1)
if(getch()=='0')v=-18;
return 0;	
}
//////////////////////////////////////////////////////////////////
main()
{
int y=250,v=0,f=0;MOUSEMSG m; 
srand((int)time(0));
for(int i=0;i<=3;i++)
	tx[i]=1000+200*i,high[i]=rand()%250+80;
initgraph(640,480);
setwritemode(R2_XORPEN);
HANDLE hThread1 = CreateThread(NULL, 0, MyThread1, NULL, 0, NULL);
HANDLE hThread2 = CreateThread(NULL, 0, MyThread2, NULL, 0, NULL);
while(1)
{
Sleep(50);
}
}