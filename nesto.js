  console.log("na nesto.html");
      $.ajax({
        url: "unosRez.php",
        data:
        {
          id_studenta: id_studenta,
          id_kolegija_Rez: id_kolegija,
          elt: elt,
          bodovi: bodovi
        },
        dataType: "json",
        success: function(data) {
          console.log(data.info);
          window.location.reload();
          navigator.serviceWorker.ready
          .then(serviceWorkerRegistration => serviceWorkerRegistration.pushManager.getSubscription())
          .then(subscription => {
            if (!subscription) {
              alert('Please enable push notifications');
              return;
            }

            const contentEncoding = (PushManager.supportedContentEncodings || ['aesgcm'])[0];
            const jsonSubscription = subscription.toJSON();
            console.log("sub"+" "+JSON.stringify(jsonSubscription) + " " + contentEncoding);
            fetch('poruka.php', {
              method: 'POST',
              body: JSON.stringify(Object.assign(jsonSubscription, { contentEncoding })),
            });
          })
        },
        error : function(xhr, status) {
          if(status !== "null")
          console.log("Nesto nije u redu s Ajax upitom. Status: " + status + ".");
        }
      });
