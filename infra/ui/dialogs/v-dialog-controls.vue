<template>
   <div class="v-dialog-controls">

      <slot>
         <!--&lt;!&ndash; * Cancel button * &ndash;&gt;-->
         <!--<md-button class="-control &#45;&#45;neutral"-->
                    <!--type="button">-->
            <!--&lt;!&ndash;<i class="-icon material-icons">ok</i>&ndash;&gt;-->
            <!--<span class="-label">Cancel</span>-->
         <!--</md-button>-->


         <!--&lt;!&ndash; * OK button * &ndash;&gt;-->
         <!--<md-button class="-control &#45;&#45;positive"-->
                    <!--type="submit"-->
                    <!--title="Create new model">-->
            <!--&lt;!&ndash;<i class="-icon material-icons">ok</i>&ndash;&gt;-->
            <!--<span class="-label">Create</span>-->
         <!--</md-button>-->
      </slot>

   </div>
</template>



<script>
export default {
   name: 'v-dialog-controls'
}
</script>



<style>
.v-dialog-controls{
   display: flex;
   justify-content: flex-end;
}
.v-dialog-controls > .-control.--neutral{
   --md-theme-default-text-primary-on-background: var(--m-grey-800);
} .v-dialog-controls > .-control.--positive{
   --md-theme-default-text-primary-on-background: var(--m-green-a400);
} .v-dialog-controls > .-control.--negative{
   --md-theme-default-text-primary-on-background: var(--m-red-800);
}
.v-dialog-controls > .-control .md-button-content > .-label{
   font-family: 'Roboto Regular', sans-serif;
   font-size: 14px;
   text-transform: uppercase;
}
.v-dialog-controls > .-control.--positive .md-button-content > .-label,
.v-dialog-controls > .-control.--negative .md-button-content > .-label{
   font-family: 'Roboto Medium', sans-serif;
}


.v-dialog-controls > .-control.md-button{
   min-width: 64px;
   margin: 0;
   padding-left: 1em;
   padding-right: 1em;

   border-radius: 5em;
}
.v-dialog-controls > .-control.md-button .md-ripple{
   padding: 0;
}
</style>
