#include<conio.h>
#include<math.h>
#include<stdlib.h>
#include<windows.h>
#include<graphics.h>
int xx=300,yy=200,x,y,flag=0,functiontype=1;
float angle_level=0.78,angle_vertical=1.0;
HWND hwnd=FindWindow("ConsoleWindowClass",NULL);
IMAGE back(640,480);
void outputpoint(int i,int j,int z);
void change();
main()
{
	initgraph(640,480);
	setwritemode(R2_XORPEN);
	while(1)
	{
	SetWorkingImage(&back);
	cleardevice();
	float x1,y1,z1;
	for(int i=-80;i<=80;i++)
	for(int j=-80;j<=80;j++) 
		{
			switch(functiontype)
			{
			case 1:
				outputpoint(i,j,100*sin(sqrt((i/40.0)*(i/40.0)+(j/40.0)*(j/40.0))));
				break;
			case 2:
				outputpoint(i,j,(i+j)/((i-j)/1.0));
				break;
			case 3:
					outputpoint(i,j,50*i/(j/1.0));
				break;
			default:break;
			}		
		}
	SetWorkingImage();
	putimage(0,0,&back);
	Sleep(10);
	change();
	}
}
void outputpoint(int px,int py,int pz)
{
	if(px==-40||px==40||py==20||py==-20||pz==20||pz==-20)flag++;
	x=int(xx-px*sin(angle_level)+py*cos(angle_level));
	y=int(yy+(px*cos(angle_level)+py*sin(angle_level))*sin(angle_vertical)-pz*sin((atan(x/float(pz))+angle_vertical)));
	putpixel(x,y,RGB(px-xx,py-yy,120));
}
void change()
{
	switch(int(getch()))
		{
		case int('a'):angle_level+=0.1;break;
		case int('d'):angle_level-=0.1;break;
		case int('w'):angle_vertical+=0.05;break;
		case int('s'):angle_vertical-=0.05;break;
		case 75:xx-=10;break;
		case 77:xx+=10;break;
		case 72:yy-=10;break;
		case 80:yy+=10;break;
		case 48:functiontype=(functiontype+1)%4;break;
		default:break;
		}
}
