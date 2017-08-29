// Set Tileset to an array of 4 strings of tile codes for the first screen of tiles displayed. Examples:

// original start screen:
/*
Tileset=[
"U9U9U9U9U9U9U0U0U0U0U0U0U0U0U0U0U0U0UcAaAaAaAaAaUdU0U0U0U0U0U0UcAeI1I1I1I1I1AfAaAaAaU0U0U0AcI1I1I1I1I1I1I1I1I1I1U0U0G9AcI1I1I1I1I1I1I1I1I1I1U0U0U0AcI1I1I1I1I1I1I1I1I1J7U0U0U0AcI1I1I1I1I1I1I1I1IaT8U0U0U0UeBeI1I1I1I1I1I1J8T8T8U0U0U0U0UeBeI1I1I1I1I1IaT8T8U0U0U0U0U0AcI1I1I1I1J8T8T8T8",
"U0U0U0U0U0U0U0U0U0U0U0U0U0U0U0U0UcAaAaAaAaAaAaUdU0U0U0U0AaAaAeI1I1I1I1I1I1AfAaAaUdU0I1I1I1I1I1I1I1I1I1I1I1I1AfAaI1I1I1I1I1I1I1I1I1I1I1I1I1I1J7I1I1I1I1I1I1I1I1I1I1I1I1I1T8I9I1I1I1I1I1I1I1I1I1I1BfAbT8T8I9J7I1I1I1I1I1I1I1BfUfU0T8T8T8T8J5I1I1I1I1I1BfUfU0U0T8T8T8T8J5I1I1I1I1I1AdU0U0U0",
"U0U0U0U0U0AcI1I1I1I1J8T8T8T8U0U0U0U0UcAeI1I1I1I1I1JaT8T8U0U0U0U0AcI1I1I1I1I1I1J8T8T8U0U0U0U0AcI1I1I1FfI1I1I1JaT8U0U0U0U0AcI1I1I1I1I1I1I1I1J6U0U0U0U0AcI1I1I1I1I1I1I1I1I1U0U0U0UcAeI1FcI1I1I1I1I1FfI1U0U0U0AcI1FdFdFdI1I1I1I1I1I1U0U0U0AcI1I1I1I1I1I1I1I1I1I1U0U0U0AcI1I1I1I1I1I1I1I1I1I1",
"T8T8T8T8J5I1I1I1I1I1AdU0U0U0T8T8T8J9I1I1I1I1I1I1AdU0U0U0T8J9J6I1I1I1I1I1I1BfUfU0U0U0T8J5I1I1I1I1I1I1I1AdU0U0U0U0J6I1I1I1I1I1I1I1BfUfU0U0U0U0I1I1I1I1I1I1I1I1AdU0U0U0U0U0I1I1I1I1I1I1BfAbUfU0U0U0U0U0I1I1I1I1BfAbUfU0U0U0U0U0U0U0BfAbAbAbUfU0U0U0U0U0U0U0U0U0UfU0U0U0U0U0U0U0U0U0U0U0U0U0"
];
*/

// random display of "Dragon Basher":
/*
Tileset=(function(){var P=[["I1","N0","N1","N2","N3","N4"],["I1","T0","Q9","Q8","Q7","Q6"],["G0","S3","S9","S8","S7","S6"],["M3","S3","M9","M8","M7","M6"],["M3","N0","Mc","Md","Me","Mf"],["M3","Q0","Qa","Qb","Qc","Qd"],["C0","Q0","Q1","Q2","Q3","Q4"]],p,r=/./g,f=function(a){return p[a];},F=function(a){return P[a];},c=function(s){var r=s,i,j,k,t;while(t={C0:["R7","K9","N6","Zz","R5","Tr","G5","G8","Gc"],G0:["D4","E3","E4","Ea","F0","F1","F2","F3","F4","F5","F6","F7","F8","F9","Fa","Fb","G1","G3","G4","G5","G6","G7","Ga","Gb","Gc","I0","O0","O6","S1","R6","R4"],I1:["Ta","S0","Fd","Jf","G8","Gc"],I2:["I4","G8","Gc"],M3:["M1","Ut","Dd","G8","Gc"],N0:["N5"],S3:["Uz","Xs","Uu"],T0:["T5","T9","G2"]}[k=r.substring(i=Math.floor(Math.random()*s.length/2),i+2)]){t=t[Math.floor(Math.random()*t.length)];
if(t=="N6"){for(j=i+2;Math.random()<.8&&j%28>i%28&&r.substring(j,j+2)==k;j+=2){t+="N7";}t=t.substring(0,t.length-2)+"N6";}
if(t=="Nc"){for(j=i+2;Math.random()<.8&&j%28>i%28&&r.substring(j,j+2)==k;j+=2){t+="Nd";}t=t.substring(0,t.length-2)+"Nc";}
if(t=="T5"||t=="Ta"||t=="R4"){for(j=i-28;j>0&&Math.random()<.7&&(k={I1:["Tb","Tc"],T0:["T6","T7"]}[r.substring(j,j+2)]);j-=28){r=r.substring(0,j)+k[Math.round(Math.random())]+r.substring(j+2);}}
r=r.substring(0,i)+t+r.substring(i+t.length);}return r;};for(p=P.length-1;p>=0;p--){P.push([P[p][1],P[p][0],P[p][5],P[p][4],P[p][3],P[p][2]]);}p=["S3"];while(p[0]=="S3"){p=P[Math.floor(Math.random()*P.length)];}P.push(["S3","I2","Vd","Ve","Vb","Vc"]);//white background blends into popup
P=P[Math.floor(Math.random()*P.length)];return[
c("00000000000000511140000000000103140000000001003154545140010001012325100100510100521001051201001010511120514031140000000000000000000000000000".replace(r,F)),
c("00000000000000000000000000000000000000000051112511454514340101001012315112010010100112000100101001111143112514011000100000000031112000000000".replace(r,F)),
c("00000000000000000000000000000511140000000000100100000000001052051405140011100251010300103405210314001001010104010511120311431200000000000000".replace(r,f)),
c("00000000000000000000000000005400000000000001000000000000015140514545400123101010123001001011201000010010145010005140143125140000000000000000".replace(r,f))];})();
if(Math.random()<.4&&Tileset[3].substring(278)=="C0"){Tileset[3]=Tileset[3].substring(0,278)+"Tz";}else{if(Math.random()<.4&&Tileset[1].substring(278)=="C0"){Tileset[1]=Tileset[1].substring(0,278)+"Tz";}}
if(Math.random()<.4&&Tileset[2].substring(252,254)=="C0"){Tileset[2]=(Math.random()<.4&&Tileset[2].substring(224,226)=="C0"?Tileset[2].substring(0,224)+"Zr"+Tileset[2].substring(226,252)+"Zu":Tileset[2].substring(0,252)+"Zr")+Tileset[2].substring(254);}
*/
