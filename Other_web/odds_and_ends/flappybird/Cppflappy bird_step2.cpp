#include<stdio.h>
#include<conio.h>
#include<stdlib.h>
#include<windows.h>
#include<time.h>
#include<graphics.h>
HWND hwnd=FindWindow("ConsoleWindowClass",NULL);
IMAGE up_pillar,dw_pillar,up_pillarpt,dw_pillarpt,huabu(640,480),bd[3],bd_y[3],background;
int x=210,y=250,v=0,G=2,m=1,f=0,tx[4],high[4],mouse,flag=0,type=0;
float k;
void putpillar(int up_pl_high,int tx);
void back_move();
void dead_judge(int i);
void typechange();
void putbird();
///////////////////////////////////////////////////////////////////
 DWORD WINAPI MyThread1(PVOID pvParam)
{
	loadimage(&bd[0],"res\\bird1_0.jpg");
	loadimage(&bd[1],"res\\bird1_1.jpg");
	loadimage(&bd[2],"res\\bird1_2.jpg");
	loadimage(&bd_y[0],"res\\bird1_0y.jpg");
	loadimage(&bd_y[1],"res\\bird1_1y.jpg");
	loadimage(&bd_y[2],"res\\bird1_2y.jpg");
	loadimage(&background,"res\\10000945345346.jpg");
	int time=0;
	while(1)
	{
		v+=(G-f);
		y=(y+v)%600;
		SetWorkingImage(&huabu);
		cleardevice();
		putimage(0,0,&background);
		typechange();
		putbird();
		back_move();
		SetWorkingImage();
		putimage(0,0,&huabu);
		Sleep(40);
		
	}//对应while
	return 0;	
}
///////////////////////////////////////////////////////////////////
DWORD WINAPI MyThread2(PVOID pvParam)
{
	while(1)
	if(getch()=='0')v=-20,flag=1;
	return 0;	
}
//////////////////////////////////////////////////////////////////
main()
{
	loadimage(&up_pillar,"res\\10000347319481.jpg");
	loadimage(&dw_pillar,"res\\100001025930108.jpg");
	srand((int)time(0));
	for(int i=0;i<=3;i++)
		tx[i]=1000+200*i,high[i]=rand()%250+80;
	initgraph(640,480);
	//setwritemode(R2_XORPEN);
	HANDLE hThread1 = CreateThread(NULL, 0, MyThread1, NULL, 0, NULL);
	HANDLE hThread2 = CreateThread(NULL, 0, MyThread2, NULL, 0, NULL);
	while(1);
}
void back_move()
{
	for(int i=0;i<=3;i++)
	{
	putpillar(high[i],tx[i]);
	if(tx[i]<=-40)tx[i]+=800,high[i]=rand()%250+80;
	tx[i]-=6;
	dead_judge(i);
	}
}
void putpillar(int up_pl_high,int tx)
{	
	SetWorkingImage(&up_pillar);
	getimage(&up_pillarpt,0,320-up_pl_high,52,up_pl_high);
	SetWorkingImage(&dw_pillar);
	getimage(&dw_pillarpt,0,0,52,360-up_pl_high);
	SetWorkingImage(&huabu);
	putimage(tx-26,0,&up_pillarpt);
	putimage(tx-26,up_pl_high+120,&dw_pillarpt);
}
void dead_judge(int i)
{
if(x-tx[i]>-40&&x-tx[i]<40&&(y<high[i]||y>high[i]+120))
	{
		y=250;
		v=0;
		mouse=MessageBox(hwnd,"游戏结束，是否重来？","you gua le",MB_YESNO|MB_ICONQUESTION);
		if(mouse==IDYES)
		{
			cleardevice();
			for(int i=0;i<=3;i++)
			{
				tx[i]=1000+200*i,high[i]=rand()%250+80;
			}
		}
		else if(mouse==IDNO)exit(1);
	}
}
void putbird()
{
	putimage(x-17,y-12,&bd_y[type/3],SRCAND);
	putimage(x-17,y-12,&bd[type/3],SRCPAINT);
}
void typechange()
{
	if(flag==1)type++;
	if(type==9)type=0,flag=0;
}