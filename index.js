const ad = document.querySelector("#ad");
    const kontenjan = document.querySelector("#kontenjan");
    //const sinif = document.querySelector("#sinif");
    const ekle = document.querySelector("#ekle");//tıklama olayı eklenecek
    const liste = document.querySelector("#liste");

    ekle.onclick = function () {
      //butona tıklanınca çalıştırılacak

      //td elementlerini oluşturuyoruz
      let tAd = document.createElement("td");
      let tKontenjan = document.createElement("td");
      let tSinif = document.createElement("td");

      tAd.textContent = ad.value;//textboxtan değeri okuyup aktarıyoruz.
      tKontenjan.textContent = kontenjan.value;//textboxtan değeri okuyup aktarıyoruz.
     // tSinif.textContent=sinif.value;//textboxtan değeri okuyup aktarıyoruz.
      tSinif.textContent = " ";
      if(tKontenjan.textContent<180 && tKontenjan.textContent>61){
        tSinif.textContent="B503";
       // alert("ilk");
       
      }
      else if (tKontenjan.textContent<100 && tKontenjan.textContent>60){
        tSinif.textContent="B403";
      //  alert("orta");
      }
      else if(tKontenjan.textContent<60 &&tKontenjan.textContent>0){
        tSinif.textContent="C501 - C408";
       // alert("son");
      }
     // alert(tSinif.textContent);
     // alert(tKontenjan.textContent);

      //tr elementi oluşturuyoruz
      let tr = document.createElement("tr");

      //tdleri tr içine ekliyoruz
      tr.appendChild(tAd);
      tr.appendChild(tKontenjan);
    
      tr.appendChild(tSinif);

      //tr elementini liste (tablo) içine ekliyoruz
      liste.appendChild(tr);

      //nenelerin için eklemeden sonra temizleyelim
      ad.value = "";
      kontenjan.value = "";
      yas.value = "";

      //temizlemeden sonra ad içine odaklansın
      ad.focus();
    }